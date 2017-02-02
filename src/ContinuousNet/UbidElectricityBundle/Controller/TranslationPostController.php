<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationPost;
use ContinuousNet\UbidElectricityBundle\Form\TranslationPostType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Post Controller
 * 
 * Manage TranslationPosts 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationPostController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationpost")
 */
class TranslationPostController extends BaseController
{
	/**
	 * Lists all TranslationPost entities.
	 *
	 * @Route("/", name="translationpost_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPosts = $em->getRepository('UbidElectricityBundle:TranslationPost')->findAll();

		return $this->render('UbidElectricityBundle:TranslationPost:index.html.twig', array(
			'translationPosts' => $translationPosts,
		));
	}

	/**
	 * Creates a new TranslationPost entity.
	 *
	 * @Route("/new", name="translationpost_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPost = new TranslationPost();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostType', $translationPost);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPost);
			$em->flush();

			return $this->redirectToRoute('translationpost_show', array('id' => $translationPost->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPost:new.html.twig', array(
			'translationPost' => $translationPost,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPost entity.
	 *
	 * @Route("/{id}", name="translationpost_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPost $translationPost)
	{
		$deleteForm = $this->createDeleteForm($translationPost);

		return $this->render('UbidElectricityBundle:TranslationPost:show.html.twig', array(
			'translationPost' => $translationPost,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPost entity.
	 *
	 * @Route("/{id}/edit", name="translationpost_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPost $translationPost)
	{
		$deleteForm = $this->createDeleteForm($translationPost);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationPostType', $translationPost);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPost);
			$em->flush();

			return $this->redirectToRoute('translationpost_edit', array('id' => $translationPost->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationPost:edit.html.twig', array(
			'translationPost' => $translationPost,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPost entity.
	 *
	 * @Route("/{id}", name="translationpost_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPost $translationPost)
	{
		$form = $this->createDeleteForm($translationPost);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPost);
			$em->flush();
		}

		return $this->redirectToRoute('translationpost_index');
	}

	/**
	 * Creates a form to delete a TranslationPost entity.
	 *
	 * @param TranslationPost $translationPost The TranslationPost entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPost $translationPost)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationpost_delete', array('id' => $translationPost->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
