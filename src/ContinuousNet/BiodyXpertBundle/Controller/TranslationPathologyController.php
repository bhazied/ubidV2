<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationPathology;
use ContinuousNet\BiodyXpertBundle\Form\TranslationPathologyType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Pathology Controller
 * 
 * Manage TranslationPathologies 
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
 * @see		TranslationPathologyController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationpathology")
 */
class TranslationPathologyController extends BaseController
{
	/**
	 * Lists all TranslationPathology entities.
	 *
	 * @Route("/", name="translationpathology_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPathologies = $em->getRepository('BiodyXpertBundle:TranslationPathology')->findAll();

		return $this->render('BiodyXpertBundle:TranslationPathology:index.html.twig', array(
			'translationPathologies' => $translationPathologies,
		));
	}

	/**
	 * Creates a new TranslationPathology entity.
	 *
	 * @Route("/new", name="translationpathology_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPathology = new TranslationPathology();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPathologyType', $translationPathology);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPathology);
			$em->flush();

			return $this->redirectToRoute('translationpathology_show', array('id' => $translationPathology->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPathology:new.html.twig', array(
			'translationPathology' => $translationPathology,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPathology entity.
	 *
	 * @Route("/{id}", name="translationpathology_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPathology $translationPathology)
	{
		$deleteForm = $this->createDeleteForm($translationPathology);

		return $this->render('BiodyXpertBundle:TranslationPathology:show.html.twig', array(
			'translationPathology' => $translationPathology,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPathology entity.
	 *
	 * @Route("/{id}/edit", name="translationpathology_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPathology $translationPathology)
	{
		$deleteForm = $this->createDeleteForm($translationPathology);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPathologyType', $translationPathology);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPathology);
			$em->flush();

			return $this->redirectToRoute('translationpathology_edit', array('id' => $translationPathology->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPathology:edit.html.twig', array(
			'translationPathology' => $translationPathology,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPathology entity.
	 *
	 * @Route("/{id}", name="translationpathology_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPathology $translationPathology)
	{
		$form = $this->createDeleteForm($translationPathology);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPathology);
			$em->flush();
		}

		return $this->redirectToRoute('translationpathology_index');
	}

	/**
	 * Creates a form to delete a TranslationPathology entity.
	 *
	 * @param TranslationPathology $translationPathology The TranslationPathology entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPathology $translationPathology)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationpathology_delete', array('id' => $translationPathology->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
