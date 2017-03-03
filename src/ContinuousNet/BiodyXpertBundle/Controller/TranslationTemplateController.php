<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationTemplate;
use ContinuousNet\BiodyXpertBundle\Form\TranslationTemplateType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Template Controller
 * 
 * Manage TranslationTemplates 
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
 * @see		TranslationTemplateController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationtemplate")
 */
class TranslationTemplateController extends BaseController
{
	/**
	 * Lists all TranslationTemplate entities.
	 *
	 * @Route("/", name="translationtemplate_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationTemplates = $em->getRepository('BiodyXpertBundle:TranslationTemplate')->findAll();

		return $this->render('BiodyXpertBundle:TranslationTemplate:index.html.twig', array(
			'translationTemplates' => $translationTemplates,
		));
	}

	/**
	 * Creates a new TranslationTemplate entity.
	 *
	 * @Route("/new", name="translationtemplate_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationTemplate = new TranslationTemplate();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationTemplateType', $translationTemplate);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationTemplate);
			$em->flush();

			return $this->redirectToRoute('translationtemplate_show', array('id' => $translationTemplate->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationTemplate:new.html.twig', array(
			'translationTemplate' => $translationTemplate,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationTemplate entity.
	 *
	 * @Route("/{id}", name="translationtemplate_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationTemplate $translationTemplate)
	{
		$deleteForm = $this->createDeleteForm($translationTemplate);

		return $this->render('BiodyXpertBundle:TranslationTemplate:show.html.twig', array(
			'translationTemplate' => $translationTemplate,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationTemplate entity.
	 *
	 * @Route("/{id}/edit", name="translationtemplate_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationTemplate $translationTemplate)
	{
		$deleteForm = $this->createDeleteForm($translationTemplate);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationTemplateType', $translationTemplate);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationTemplate);
			$em->flush();

			return $this->redirectToRoute('translationtemplate_edit', array('id' => $translationTemplate->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationTemplate:edit.html.twig', array(
			'translationTemplate' => $translationTemplate,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationTemplate entity.
	 *
	 * @Route("/{id}", name="translationtemplate_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationTemplate $translationTemplate)
	{
		$form = $this->createDeleteForm($translationTemplate);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationTemplate);
			$em->flush();
		}

		return $this->redirectToRoute('translationtemplate_index');
	}

	/**
	 * Creates a form to delete a TranslationTemplate entity.
	 *
	 * @param TranslationTemplate $translationTemplate The TranslationTemplate entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationTemplate $translationTemplate)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationtemplate_delete', array('id' => $translationTemplate->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
