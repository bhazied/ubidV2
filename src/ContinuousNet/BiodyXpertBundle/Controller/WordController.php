<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Word;
use ContinuousNet\BiodyXpertBundle\Form\WordType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Word Controller
 * 
 * Manage Words 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		WordController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/word")
 */
class WordController extends BaseController
{
	/**
	 * Lists all Word entities.
	 *
	 * @Route("/", name="word_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$words = $em->getRepository('BiodyXpertBundle:Word')->findAll();

		return $this->render('BiodyXpertBundle:Word:index.html.twig', array(
			'words' => $words,
		));
	}

	/**
	 * Creates a new Word entity.
	 *
	 * @Route("/new", name="word_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$word = new Word();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\WordType', $word);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($word);
			$em->flush();

			return $this->redirectToRoute('word_show', array('id' => $word->getId()));
		}

		return $this->render('BiodyXpertBundle:Word:new.html.twig', array(
			'word' => $word,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Word entity.
	 *
	 * @Route("/{id}", name="word_show")
	 * @Method("GET")
	 */
	public function showAction(Word $word)
	{
		$deleteForm = $this->createDeleteForm($word);

		return $this->render('BiodyXpertBundle:Word:show.html.twig', array(
			'word' => $word,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Word entity.
	 *
	 * @Route("/{id}/edit", name="word_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Word $word)
	{
		$deleteForm = $this->createDeleteForm($word);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\WordType', $word);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($word);
			$em->flush();

			return $this->redirectToRoute('word_edit', array('id' => $word->getId()));
		}

		return $this->render('BiodyXpertBundle:Word:edit.html.twig', array(
			'word' => $word,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Word entity.
	 *
	 * @Route("/{id}", name="word_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Word $word)
	{
		$form = $this->createDeleteForm($word);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($word);
			$em->flush();
		}

		return $this->redirectToRoute('word_index');
	}

	/**
	 * Creates a form to delete a Word entity.
	 *
	 * @param Word $word The Word entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Word $word)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('word_delete', array('id' => $word->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
